import { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    BounceInDown,
    FadeInUp,
    FadeOutRight,
    FlipInYLeft,
    Layout,
    LightSpeedInLeft,
    RotateInUpLeft,
    SlideInLeft,
    SlideInRight,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    ZoomIn,
} from 'react-native-reanimated';
import TaskItem from '../components/TaskItem';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation, tasks, setTasks }) {
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 🪩 Floating animated bubble
  const floatY = useSharedValue(0);
  useEffect(() => {
    floatY.value = withRepeat(withTiming(10, { duration: 1500 }), -1, true);
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <View style={styles.container}>

      <Animated.View entering={RotateInUpLeft.duration(1200)} style={styles.circleDecor1} />
      <Animated.View entering={FlipInYLeft.delay(400).duration(1200)} style={styles.circleDecor2} />
      <Animated.View entering={SlideInLeft.delay(600).duration(800)} style={styles.barDecorLeft} />
      <Animated.View entering={SlideInRight.delay(800).duration(800)} style={styles.barDecorRight} />

     
      <Animated.View style={[styles.floatingBubble, floatingStyle]} />

    
      <Animated.Text
        entering={BounceInDown.duration(700)}
        layout={Layout.springify()}
        style={styles.title}
      >
        📝 My To-Do List
      </Animated.Text>

      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeInUp.duration(400)}
            exiting={FadeOutRight.duration(300)}
            layout={Layout.springify()}
          >
            <TaskItem task={item} onDelete={() => deleteTask(item.id)} />
          </Animated.View>
        )}
        ListEmptyComponent={
          <Animated.Text
            entering={LightSpeedInLeft.delay(300).duration(900)}
            style={styles.emptyText}
          >
            No tasks yet! Tap ＋ to add something cool 💡
          </Animated.Text>
        }
      />


      <Animated.View entering={ZoomIn.delay(400).duration(600)} layout={Layout.springify()}>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Add Task')}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f2f6',
    overflow: 'hidden',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#1e272e',
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 35,
    backgroundColor: '#3742fa',
    width: 75,
    height: 75,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  fabText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#57606f',
    fontSize: 18,
    marginTop: 40,
    fontStyle: 'italic',
  },

  // Decorative elements
  circleDecor1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#a29bfe',
    top: -50,
    left: -60,
    opacity: 0.2,
  },
  circleDecor2: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fdcb6e',
    bottom: -40,
    right: -40,
    opacity: 0.2,
  },
  barDecorLeft: {
    position: 'absolute',
    width: 20,
    height: 120,
    backgroundColor: '#00b894',
    top: 150,
    left: -10,
    borderRadius: 10,
    opacity: 0.3,
  },
  barDecorRight: {
    position: 'absolute',
    width: 20,
    height: 120,
    backgroundColor: '#fab1a0',
    top: 250,
    right: -10,
    borderRadius: 10,
    opacity: 0.3,
  },

  //  Floating bubble
  
  floatingBubble: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#74b9ff',
    opacity: 0.5,
  },
});











