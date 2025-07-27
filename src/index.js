import React from 'react'
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { Flip, ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
  <ToastContainer
				position="bottom-right"
				autoClose={2500}
				hideProgressBar
				limit={5}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Flip}
			/>
)
