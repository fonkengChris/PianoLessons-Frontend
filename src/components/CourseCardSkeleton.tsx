import {
  Card,
  CardBody,
  Skeleton,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";

const CourseCardSkeleton = () => {
  return (
    <Card bg="gray.700" color="white">
      <Skeleton height="200px" />
      <CardBody>
        <VStack align="start" spacing={3}>
          <Skeleton height="20px" width="80%" />
          <Skeleton height="16px" width="100%" />
          <Skeleton height="16px" width="60%" />

          <HStack spacing={2}>
            <Skeleton height="20px" width="60px" />
            <Skeleton height="16px" width="80px" />
          </HStack>

          <HStack spacing={2} alignItems="center">
            <Skeleton height="24px" width="24px" borderRadius="full" />
            <Skeleton height="16px" width="100px" />
          </HStack>

          <HStack justifyContent="space-between" width="100%">
            <Skeleton height="16px" width="80px" />
            <Skeleton height="16px" width="60px" />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CourseCardSkeleton;
