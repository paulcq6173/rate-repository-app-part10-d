import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';
import MyReviews from '../pages/MyReviews';
import NewComment from '../pages/NewComment';
import Repository from '../pages/Repository';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/repositories/:id" element={<Repository />} />
        <Route path="/newComment" element={<NewComment />} />
        <Route path="/myReviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
