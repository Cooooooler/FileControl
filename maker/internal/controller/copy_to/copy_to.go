package copy_to

import (
	"context"
	"io"
	"os"
	"path/filepath"

	"github.com/gogf/gf/v2/frame/g"

	v1 "maker/api/copy_to/v1"
)

type Controller struct{}

func New() *Controller {
	return &Controller{}
}

func (c *Controller) CopyTo(ctx context.Context, req *v1.Req) (res *v1.Res, err error) {
	if _, err = os.Stat(req.SourcePath); os.IsNotExist(err) {
		res = &v1.Res{
			Code:    404,
			Message: "源文件夹不存在",
		}
		g.RequestFromCtx(ctx).Response.Writeln(res) // 使用 Writeln
		return
	}

	if err = os.MkdirAll(req.DestinationPath, os.ModePerm); err != nil {
		res = &v1.Res{
			Code:    500,
			Message: "无法创建目标文件夹",
		}
		g.RequestFromCtx(ctx).Response.Writeln(res) // 使用 Writeln
		return
	}

	entries, err := os.ReadDir(req.SourcePath)
	if err != nil {
		res = &v1.Res{
			Code:    500,
			Message: "无法读取源文件夹",
		}
		g.RequestFromCtx(ctx).Response.Writeln(res) // 使用 Writeln
		return
	}

	for _, entry := range entries {
		srcFilePath := filepath.Join(req.SourcePath, entry.Name())
		destFilePath := filepath.Join(req.DestinationPath, entry.Name())

		if err = copyFile(srcFilePath, destFilePath); err != nil {
			res = &v1.Res{
				Code:    500,
				Message: "文件复制失败: " + err.Error(),
			}
			g.RequestFromCtx(ctx).Response.Writeln(res) // 使用 Writeln
			return
		}
	}

	res = &v1.Res{
		Code:    200,
		Message: "操作成功",
	}
	g.RequestFromCtx(ctx).Response.Writeln(res) // 使用 Writeln
	return
}

func copyFile(src, dest string) error {
	input, err := os.Open(src)
	if err != nil {
		return err
	}
	defer input.Close()

	output, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer output.Close()

	_, err = io.Copy(output, input)
	return err
}
