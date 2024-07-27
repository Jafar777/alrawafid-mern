import React from 'react'
import { BrowserRouter,Routes , Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ListingSearch from './pages/ListingSearch'
import Header from './components/Header'
import FooterCom from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import Contact from './pages/Contact'
import Search from './pages/Search'
import CreateListing from './pages/CreateListing'
import Listing from './pages/Listing'
export default function App() {
  return (
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Signin />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        
        <Route path='/listingsearch' element={<ListingSearch />} />
        <Route path='/listing/:listingId' element={<Listing />} />


        <Route element={<PrivateRoute/>}>
        <Route path='/search' element={<Search />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePost />}/>
        <Route path='/update-post/:postId' element={<UpdatePost />}/>
        <Route path='/create-listing' element={<CreateListing />} />
        </Route>
        
        
        <Route path='/contact' element={<Contact />}/>
        <Route path='/post/:postSlug' element={<PostPage />}/>
      </Routes>
      <FooterCom/>
    </BrowserRouter>
  )
}
