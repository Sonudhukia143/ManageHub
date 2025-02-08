import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout.jsx';
import Loader from './helperComponent/Loader.jsx';
import ErrorTemplate from './components/ErrorTemplate.jsx';
import UndefinedPath from './components/UndefinedPath.jsx';
import './App.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import CreateEventForm from './routes/CreateEvent.jsx';

const EventDetails = lazy(() => import('./routes/EventDetails.jsx'));
const SignIn = lazy(() => import('./routes/SignIn.jsx'));
const Login = lazy(() => import('./routes/Login.jsx'));
const Events = lazy(() => import('./routes/Events.jsx'));
const Homepage = lazy(() => import('./routes/Homepage.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorTemplate />} >
        <Route index element={
          <Suspense fallback={<Loader props={"Loading"} />} >
            <Homepage />
          </Suspense>
        } />
        <Route path="/events" element={
          <Suspense fallback={<Loader props={"Checking Events"} />} >
            <Events />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<Loader props={"Loggin In"} />} >
            <Login />
          </Suspense>

        } />
        <Route path="/signin" element={
          <Suspense fallback={<Loader props={"Signing Up"} />} >
            <SignIn />
          </Suspense>
        } />
        <Route path="/createEvent" element={
          <Suspense fallback={<Loader props={"Loading Events Form"} />} >
            <CreateEventForm />
          </Suspense>
        } />
        <Route path="/event/:id" element={
          <Suspense fallback={<Loader props={"Loading Event Details"} />} >
            <EventDetails />
          </Suspense>
        } />
        <Route path="*" element={<UndefinedPath />} />
      </Route>
    </>
  )
)

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

