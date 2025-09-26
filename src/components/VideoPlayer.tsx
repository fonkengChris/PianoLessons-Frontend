import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { 
  Box, 
  Button, 
  Text, 
  Heading, 
  VStack, 
  HStack, 
  Spinner, 
  Alert, 
  AlertIcon,
  IconButton,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Lesson from "../entities/Lesson";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from "react-icons/fa";

interface Props {
  lesson: Lesson;
  onLessonComplete?: () => void;
  isSubscribed?: boolean;
}

const VideoPlayer = ({ lesson, onLessonComplete, isSubscribed = true }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();


  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleError = (error: any) => {
    console.error('Video player error:', error);
    setHasError(true);
    setErrorMessage('Failed to load video. Please check the video URL.');
    setIsLoading(false);
    toast({
      title: "Video Error",
      description: "There was an error loading the video. Please check the video URL.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleReady = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onLessonComplete) {
      onLessonComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSubscribed) {
    return (
      <Box
        height="400px"
        bg="gray.700"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        border="1px solid"
        borderColor="gray.600"
      >
        <Text mb={4} color="white" fontSize="lg" fontWeight="medium">
          Subscribe to access this lesson
        </Text>
        <Link to="/pricing">
          <Button colorScheme="blue" size="lg">
            View Pricing
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <Box bg="gray.700" p={4} borderRadius="md">
        <Heading color="white" size="md" mb={2}>
          {lesson.title}
        </Heading>
        <Text color="gray.300" fontSize="sm">
          Duration: {lesson.duration} minutes
        </Text>
      </Box>

      <Box 
        ref={containerRef}
        position="relative"
        bg="black"
        borderRadius="md"
        overflow="hidden"
        minH="400px"
        maxH="600px"
      >
        {isLoading && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={2}
          >
            <Spinner size="xl" color="blue.500" />
          </Box>
        )}

        {hasError ? (
          <Box
            height="400px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg="gray.800"
          >
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
              <AlertIcon boxSize="40px" mr={0} />
              <Text mt={4} mb={4} color="red.400">
                {errorMessage}
              </Text>
              <Text mb={4} color="gray.400" fontSize="sm">
                Video URL: {lesson.videoUrl}
              </Text>
              <Button 
                colorScheme="red" 
                variant="outline" 
                onClick={() => {
                  setHasError(false);
                  setIsLoading(true);
                }}
              >
                Retry
              </Button>
            </Alert>
          </Box>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={lesson.videoUrl}
            width="100%"
            height="400px"
            playing={isPlaying}
            muted={isMuted}
            volume={volume}
            controls={true}
            onReady={handleReady}
            onError={handleError}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
          />
        )}
      </Box>

    

    </VStack>
  );
};

export default VideoPlayer;
