import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import {
    setListFavorites,
    setUser
} from "../redux/features/userSlice";

import Topbar from "./components/Topbar";
import AuthModal from "../components/auth/AuthModal";
import GlobalLoading from "./components/GlobalLoading";
import Footer from "./components/Footer";

import userApi from "../api/modules/user.api";
import favoriteApi from "../api/modules/favorite.api";

const MainLayout = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    // Lấy thông tin user
    useEffect(() => {
        const authUser = async () => {
            const { response, err } = await userApi.getInfo();

            if (response) {
                return dispatch(setUser(response))
            };

            if (err) {
                return dispatch(setUser(null))
            };
        };

        authUser();
    }, [dispatch]);

    // Lấy ra danh sách yêu thích
    useEffect(() => {
        const getFavorites = async () => {
            const { response, err } = await favoriteApi.getList();

            if (response) {
                return dispatch(setListFavorites(response))
            };

            if (err) {
                toast.error(err.message);
            };
        };

        if (user) {
            getFavorites()
        } else {
            dispatch(setListFavorites([]))
        }
    }, [user, dispatch]);

    return (
        <>
            <GlobalLoading />
            <AuthModal />

            <Box display="flex" minHeight="100vh">
                <Topbar />
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default MainLayout;