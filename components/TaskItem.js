import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
    BounceInLeft,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
    ZoomOut
} from 'react-native-reanimated';

export default function TaskItem({ task, onDelete, onLongPress }) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (task.isWobbling) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 50 }),
          withTiming(5, { duration: 50 }),
          withTiming(0, { duration: 50 })
        ),
        4,
        false
      );
    }
  }, [task.isWobbling]);

  const wobbleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleDeletePressIn = () => {
    scale.value = withSpring(0.85);
  };

  const handleDeletePressOut = () => {
    scale.value = withSpring(1);
    onDelete();
  };

  return (
    <Animated.View
      entering={BounceInLeft.duration(500)}
      exiting={ZoomOut.duration(300)}
      style={[styles.task, wobbleStyle]}
    >
      <TouchableOpacity
        style={styles.textContainer}
        onLongPress={onLongPress}
        delayLongPress={200}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>{task.text}</Text>
      </TouchableOpacity>

      <Animated.View style={[scaleStyle]}>
        <TouchableOpacity
          onPressIn={handleDeletePressIn}
          onPressOut={handleDeletePressOut}
        >
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,

   
    borderWidth: 1,
    borderColor: '#f1f2f6',
  },
  textContainer: {
    maxWidth: '88%',
  },
  text: {
    fontSize: 17,
    color: '#2f3542',
    fontWeight: '500',
  },
  delete: {
    fontSize: 22,
    color: '#ff4757',
  },
});
























  


