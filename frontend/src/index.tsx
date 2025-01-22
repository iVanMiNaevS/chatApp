import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./variables.scss";
import {Login} from "./pages/login/Login";
import {Register} from "./pages/registration/Register";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute";
import {Home} from "./pages/Home";
import {store} from "./store/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					></Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
