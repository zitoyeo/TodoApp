import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import DateHead from "./components/DateHead";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AddTodo from "./components/AddTodo";
import Empty from "./components/Empty";
import TodoList from "./components/TodoList";

import todosStorage from "./storages/todosStorage";

function App() {
  const today = new Date();

  const [todos, setTodos] = useState([
    { id: 1, text: "작업환경 설정", done: true },
    { id: 2, text: "리액트 네이티브 기초 공부", done: false },
    { id: 3, text: "투두리스트 만들기 ", done: false },
  ]);

  useEffect(() => {
    todosStorage.get().then().catch(console.error);
  }, []);

  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);

  const onInsert = (text) => {
    // 새로 등ㅗ할 항ㅗ의 id를 구한다
    // 등록된 항목 중에서 가장 큰 id를 구하고, 그값에 1을 더한다
    // 만약 리스트가 비어있다면 1을 id로 사용한다.

    const nextId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };

  const onToggle = (id) => {
    const nextTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(nextTodos);
  };

  const onRemove = (id) => {
    const nextTodos = todos.filter((todo) => todo.id !== id);
    setTodos(nextTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["bottom"]} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: undefined })}
          style={styles.avoid}
        >
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: "white",
  },
  avoid: {
    flex: 1,
  },
});

export default App;
