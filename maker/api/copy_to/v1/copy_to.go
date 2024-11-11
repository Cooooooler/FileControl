package v1

import (
	"github.com/gogf/gf/v2/frame/g"
)

type Req struct {
	g.Meta          `path:"/copyTo" tags:"copyTo" method:"post" summary:"将源文件夹中的文件拷贝到目标文件夹中"`
	SourcePath      string `json:"sourcePath" validate:"required" example:"/path/to/source"`
	DestinationPath string `json:"destinationPath" validate:"required" example:"/path/to/destination"`
}
type Res struct {
	g.Meta  `mime:"application/json" example:"string"`
	Code    int    `json:"code"`
	Message string `json:"message"`
}
