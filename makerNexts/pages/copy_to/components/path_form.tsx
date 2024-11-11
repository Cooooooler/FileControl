"use client";

import { Input } from "@nextui-org/input";
import { FormEvent, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";

import { CopyTo } from "@/services";
import { rulesCheck } from "@/form_rules_check";

export default function PathForm() {
  const [isInvalidSourcePath, setIsInvalidSourcePath] = useState(false);
  const [isInvalidDestinationPath, setIsInvalidDestinationPath] =
    useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const sourcePath = formData.get("SourcePath") as string;
    const destinationPath = formData.get("DestinationPath") as string;
    const isInvalid = rulesCheck(
      [
        { value: sourcePath, setIsInvalid: setIsInvalidSourcePath },
        { value: destinationPath, setIsInvalid: setIsInvalidDestinationPath },
      ],
      validateNotEmpty,
    );

    if (!isInvalid) return;

    const res = await CopyTo({ sourcePath, destinationPath });
  };
  const validateNotEmpty = (value: string): boolean => {
    const regex = /^(?!\s*$).+/;

    return regex.test(value);
  };

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        color={isInvalidSourcePath ? "danger" : "success"}
        defaultValue="/Users/xiaoxin/Downloads/xiazai"
        errorMessage="请输入源文件夹路径"
        isInvalid={isInvalidSourcePath}
        label="源文件夹路径"
        name="SourcePath"
      />
      <Input
        isRequired
        color={isInvalidDestinationPath ? "danger" : "success"}
        defaultValue="/Users/xiaoxin/lonson/hanggangwangzhanai/huanggang-aiqa/src/assets/img"
        errorMessage="请输入目标文件夹路径"
        isInvalid={isInvalidDestinationPath}
        label="目标文件夹路径"
        name="DestinationPath"
      />
      <div className="flex items-center justify-center">
        <ButtonGroup color="secondary">
          <Button type="submit">确定</Button>
          <Button type="reset">重置</Button>
        </ButtonGroup>
      </div>
    </form>
  );
}
