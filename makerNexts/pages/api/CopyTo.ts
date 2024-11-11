// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  code: number;
  message: string;
  data: any;
};

const sendRequest: (data: {
  sourcePath: string;
  destinationPath: string;
}) => Promise<any> = async ({ sourcePath, destinationPath }) => {
  const url = "http://127.0.0.1:8000/copyTo"; // 请求的 URL

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourcePath, destinationPath }),
    });

    if (!response.ok) {
      throw new Error("网络响应不正常，状态码：" + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("发生错误：", error);

    return { code: 500, message: error, data: null };
  }
};

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { sourcePath, destinationPath } = req.body;

    const result = await sendRequest({ sourcePath, destinationPath });

    return res.status(200).json(result);
  }
}
