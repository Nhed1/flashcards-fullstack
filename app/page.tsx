"use client";

import { Flex } from "@chakra-ui/react";
import { SignIn, useAuth } from "@clerk/nextjs";
import HomeHeader from "./home-header";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      redirect("/home");
    }
  }, [isSignedIn]);

  return (
    <Flex
      justify="center"
      flexDirection="column"
      alignItems="center"
      w="100%"
      h="100%"
      backgroundColor="gray.200"
      overflow="hidden"
    >
      <HomeHeader style={{ position: "absolute" }} />
      <SignIn />
    </Flex>
  );
}
