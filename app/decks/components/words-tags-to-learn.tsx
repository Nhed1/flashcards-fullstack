import { Flex, Tag, Text } from "@chakra-ui/react";

export const WordsTagsToLearn = ({
  selectedFrontTexts,
}: {
  selectedFrontTexts: string[];
}) => {
  if (selectedFrontTexts.length === 0) {
    return <Text as="b">words to learn not found</Text>;
  }

  return (
    <Flex gap="8px" wrap="wrap">
      <Text as="b">words to learn:</Text>
      {selectedFrontTexts.map((tag) => (
        <Tag
          variant="outline"
          colorScheme="purple"
          key={tag}
          width="fit-content"
        >
          {tag}
        </Tag>
      ))}
    </Flex>
  );
};
