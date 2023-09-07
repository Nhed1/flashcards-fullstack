import {
  InputGroup,
  InputProps,
  InputRightAddon,
  Input,
} from "@chakra-ui/react";
import React from "react";

interface InputLimit extends InputProps {
  limit: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputLimit = (props: InputLimit) => {
  const { onChange, value, limit } = props;

  const onChangeInputLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value.length !== limit) {
      onChange(e);
    }
  };

  return (
    <InputGroup>
      <Input {...props} onChange={onChangeInputLimit} />
      <InputRightAddon>{`${props.value.length}/${props.limit}`}</InputRightAddon>
    </InputGroup>
  );
};
