import { Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface IDifficulty {
  setDifficulty: (value: string) => void;
  difficulty: string;
}

export const DifficultyFlashcard = ({
  setDifficulty,
  difficulty,
}: IDifficulty) => {
  return (
    <RadioGroup onChange={setDifficulty} value={difficulty} defaultValue="1">
      <VStack gap="-2px">
        <Text as="b">Select difficulty:</Text>

        <Stack direction="row">
          <Radio value="1">easy</Radio>
          <Radio value="2">normal</Radio>
          <Radio value="3">hard</Radio>
        </Stack>
      </VStack>
    </RadioGroup>
  );
};
