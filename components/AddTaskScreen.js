import { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Animated, {
    FadeInDown,
    SlideInUp,
    ZoomIn,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function AddTaskScreen({ navigation, setTasks, tasks }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim().length === 0) return;
    setTasks([...tasks, { id: Date.now().toString(), text: task, isWobbling: false }]);
    navigation.goBack();
  };

  // Floating animated sparkle
  const floatY = useSharedValue(0);
  floatY.value = withRepeat(withTiming(12, { duration: 2000 }), -1, true);
  const sparkleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Sparkle Bubble */}
      <Animated.View style={[styles.sparkle, sparkleStyle]} />

      {/* Main Card */}
      <Animated.View entering={FadeInDown.duration(700)} style={styles.card}>
        <Text style={styles.label}>✨ What's your new task?</Text>
        <TextInput
          placeholder="e.g. Plan weekend trip"
          placeholderTextColor="#95a5a6"
          style={styles.input}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.btn} onPress={handleAdd}>
          <Animated.Text entering={ZoomIn} style={styles.btnText}>Add ➕</Animated.Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Fun Tagline */}
      <Animated.Text entering={SlideInUp.delay(300)} style={styles.footerText}>
        🚀 A task a day keeps chaos away!
      </Animated.Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#f6e58d',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 25,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    marginBottom: 40,
  },
  label: {
    fontSize: 24,
    marginBottom: 15,
    color: '#2d3436',
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#dcdde1',
    borderRadius: 14,
    padding: 14,
    fontSize: 17,
    marginBottom: 25,
    color: '#2f3542',
    backgroundColor: '#f1f2f6',
  },
  btn: {
    backgroundColor: '#00cec9',
    padding: 16,
    borderRadius: 14,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2d3436',
    fontStyle: 'italic',
  },

  // 🎉 Sparkle decoration
  sparkle: {
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.45,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fab1a0',
    opacity: 0.4,
  },
});








