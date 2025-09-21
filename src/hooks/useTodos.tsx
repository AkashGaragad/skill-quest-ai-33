import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'thisWeek' | 'inProgress' | 'completed';
  due_date?: string;
  completed: boolean;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export function useTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<{
    thisWeek: Todo[];
    inProgress: Todo[];
    completed: Todo[];
  }>({
    thisWeek: [],
    inProgress: [],
    completed: []
  });
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const categorizedTodos = {
        thisWeek:
          data
            ?.filter((todo) => todo.status === 'thisWeek')
            .map((todo) => ({
              ...todo,
              priority: todo.priority as 'low' | 'medium' | 'high',
              status: todo.status as 'thisWeek' | 'inProgress' | 'completed',
              completed_at: todo.completed_at || undefined
            })) || [],
        inProgress:
          data
            ?.filter((todo) => todo.status === 'inProgress')
            .map((todo) => ({
              ...todo,
              priority: todo.priority as 'low' | 'medium' | 'high',
              status: todo.status as 'thisWeek' | 'inProgress' | 'completed',
              completed_at: todo.completed_at || undefined
            })) || [],
        completed:
          data
            ?.filter((todo) => todo.status === 'completed')
            .map((todo) => ({
              ...todo,
              priority: todo.priority as 'low' | 'medium' | 'high',
              status: todo.status as 'thisWeek' | 'inProgress' | 'completed',
              completed_at: todo.completed_at || undefined
            })) || []
      };

      setTodos(categorizedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch todos',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (
    title: string,
    description?: string,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    if (!user || !title.trim()) return;

    try {
      const { error } = await supabase.from('todos').insert({
        user_id: user.id,
        title: title.trim(),
        description,
        priority,
        status: 'thisWeek'
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Task added successfully'
      });

      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  };

  const updateTodo = async (todoId: string, updates: Partial<Todo>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', todoId)
        .eq('user_id', user.id);

      if (error) throw error;

      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      });
    }
  };

  const toggleTodo = async (todoId: string, fromStatus: string) => {
    const todo = todos[fromStatus as keyof typeof todos]?.find(
      (t) => t.id === todoId
    );
    if (!todo) return;

    const newCompleted = !todo.completed;
    const newStatus = newCompleted ? 'completed' : 'thisWeek';

    await updateTodo(todoId, {
      completed: newCompleted,
      status: newStatus,
      completed_at: newCompleted ? new Date().toISOString() : null
    });
  };

  const deleteTodo = async (todoId: string, columnKey?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Task deleted successfully'
      });

      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive'
      });
    }
  };

  const moveTodo = async (
    todoId: string,
    fromStatus: string,
    toStatus: 'thisWeek' | 'inProgress' | 'completed'
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ status: toStatus })
        .eq('id', todoId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Moved',
        description: `Task moved to ${toStatus}`
      });

      fetchTodos();
    } catch (error) {
      console.error('Error moving todo:', error);
      toast({
        title: 'Error',
        description: 'Failed to move task',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    moveTodo, // ✅ added
    refetch: fetchTodos
  };
}
