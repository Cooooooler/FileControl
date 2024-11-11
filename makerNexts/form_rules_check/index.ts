import { Dispatch, SetStateAction } from "react";

const rulesCheck = (
  data: {
    value: string;
    setIsInvalid: Dispatch<SetStateAction<boolean>>;
  }[],
  validateFunc: (value: string) => boolean,
) => {
  let flag = true;

  data.forEach((item) => {
    if (!validateFunc(item.value)) {
      item.setIsInvalid(true);
      flag = false;
    } else {
      item.setIsInvalid(false);
    }
  });

  return flag;
};

export { rulesCheck };
