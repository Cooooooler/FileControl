package main

import (
	_ "maker/internal/packed"

	"github.com/gogf/gf/v2/os/gctx"

	"maker/internal/cmd"
)

func main() {
	cmd.Main.Run(gctx.New())
}
