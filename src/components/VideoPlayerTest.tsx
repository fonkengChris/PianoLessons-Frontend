import React from "react";
import { Box, VStack, Text, Heading, Alert, AlertIcon } from "@chakra-ui/react";
import VideoPlayer from "./VideoPlayer";
import { detectBrowser, getBrowserCapabilities } from "../utils/videoCompatibility";

// Test component to demonstrate video player capabilities
const VideoPlayerTest = () => {
  const browser = detectBrowser();
  const capabilities = getBrowserCapabilities();

  // Sample lesson for testing
  const sampleLesson = {
    _id: "test-lesson-1",
    courseId: "test-course-1",
    title: "Sample Piano Lesson - Cross Browser Test",
    description: "This is a test lesson to demonstrate the video player's cross-browser compatibility features.",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", // Sample video URL
    duration: 5,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <VStack spacing={6} p={6} align="stretch">
      <Heading color="white" size="lg">
        Video Player Cross-Browser Compatibility Test
      </Heading>

      {/* Browser Information */}
      <Box bg="gray.700" p={4} borderRadius="md">
        <Heading color="white" size="md" mb={3}>
          Browser Detection
        </Heading>
        <VStack spacing={2} align="start">
          <Text color="gray.300">
            <strong>Browser:</strong> {browser.name} {browser.version}
          </Text>
          <Text color="gray.300">
            <strong>MP4 Support:</strong> {browser.supportsMP4 ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>WebM Support:</strong> {browser.supportsWebM ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>OGG Support:</strong> {browser.supportsOGV ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>HLS Support:</strong> {browser.supportsHLS ? "✅ Yes" : "❌ No"}
          </Text>
        </VStack>
      </Box>

      {/* Browser Capabilities */}
      <Box bg="gray.700" p={4} borderRadius="md">
        <Heading color="white" size="md" mb={3}>
          Browser Capabilities
        </Heading>
        <VStack spacing={2} align="start">
          <Text color="gray.300">
            <strong>Fullscreen:</strong> {capabilities.supportsFullscreen ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>Picture-in-Picture:</strong> {capabilities.supportsPictureInPicture ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>WebGL:</strong> {capabilities.supportsWebGL ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>WebAssembly:</strong> {capabilities.supportsWebAssembly ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>Service Worker:</strong> {capabilities.supportsServiceWorker ? "✅ Yes" : "❌ No"}
          </Text>
          <Text color="gray.300">
            <strong>WebRTC:</strong> {capabilities.supportsWebRTC ? "✅ Yes" : "❌ No"}
          </Text>
        </VStack>
      </Box>

      {/* Video Player Test */}
      <Box>
        <Heading color="white" size="md" mb={3}>
          Video Player Test
        </Heading>
        <Alert status="info" mb={4}>
          <AlertIcon />
          This video player supports multiple formats (MP4, WebM, OGG) and includes fallback mechanisms for maximum browser compatibility.
        </Alert>
        <VideoPlayer
          lesson={sampleLesson}
          isSubscribed={true}
          onLessonComplete={() => console.log("Lesson completed!")}
        />
      </Box>

      {/* Test Instructions */}
      <Box bg="gray.800" p={4} borderRadius="md">
        <Heading color="white" size="md" mb={3}>
          Test Instructions
        </Heading>
        <VStack spacing={2} align="start">
          <Text color="gray.300">
            • <strong>Play/Pause:</strong> Click the play button or press Space
          </Text>
          <Text color="gray.300">
            • <strong>Mute/Unmute:</strong> Click the volume button or press M
          </Text>
          <Text color="gray.300">
            • <strong>Fullscreen:</strong> Click the expand button or press F
          </Text>
          <Text color="gray.300">
            • <strong>Seek:</strong> Use left/right arrow keys to seek 10 seconds
          </Text>
          <Text color="gray.300">
            • <strong>Settings:</strong> Click the gear icon to access quality and volume controls
          </Text>
          <Text color="gray.300">
            • <strong>Quality Selection:</strong> Choose between different video formats in settings
          </Text>
        </VStack>
      </Box>

      {/* Browser Compatibility Notes */}
      <Box bg="gray.800" p={4} borderRadius="md">
        <Heading color="white" size="md" mb={3}>
          Browser Compatibility Notes
        </Heading>
        <VStack spacing={2} align="start">
          <Text color="gray.300">
            <strong>Chrome:</strong> Full support for MP4, WebM, and OGG formats
          </Text>
          <Text color="gray.300">
            <strong>Firefox:</strong> Excellent WebM support, good MP4 support
          </Text>
          <Text color="gray.300">
            <strong>Safari:</strong> Primarily MP4 support, limited WebM support
          </Text>
          <Text color="gray.300">
            <strong>Edge:</strong> Full support for MP4 and WebM formats
          </Text>
          <Text color="gray.300">
            <strong>Opera:</strong> Similar to Chrome with full format support
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export default VideoPlayerTest;
