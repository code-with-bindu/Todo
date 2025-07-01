import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';


import AddTaskScreen from './components/AddTaskScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerStyle: { backgroundColor: '#1e90ff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  tasks={tasks}
                  setTasks={setTasks}
                  user={user}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Add Task">
              {(props) => (
                <AddTaskScreen
                  {...props}
                  tasks={tasks}
                  setTasks={setTasks}
                  user={user}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



/*D:\react app>cd my-app

D:\react app\my-app>git status
fatal: not a git repository (or any of the parent directories): .git

D:\react app\my-app>git init
Initialized empty Git repository in D:/react app/my-app/.git/

D:\react app\my-app>git remote add origin https://github.com/code-with-bindu/Todo.git

D:\react app\my-app> 





git add .
git commit -m "Initial Todo commit"
git branch -M main
git push -u origin main








*/