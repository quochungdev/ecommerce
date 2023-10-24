import axios from "axios";
import cookie from "react-cookies";


const SERVER = "http://localhost:8080";

export const endpoints = {
    "signin": `/api/signin/`,
    "register": `/api/register/`,
    "current-user": `/api/user/profile/`,
    "user": `/api/admin/users/`,
    "user_change_status": `/api/user/change-status/`,

    "categories":  `/api/categories/`,
    "create_category":  `/api/admin/create_category/`,
    "update_category": (categoryId) => `/api/admin/update_category/${categoryId}/`,
    "delete_category": (categoryId) => `/api/admin/delete_category/${categoryId}/`,

    "banners":  `/api/admin/banners/`,
    "create_banner": `/api/admin/create_banner/`,
    "update_banner":   (id) => `/api/admin/update_banner/${id}/`,
    "delete_banner": (id) => `/api/admin/delete_banner/${id}/`,

    "verify_mail":`/api/shop/verify-mail/`,
    "role_shop": `/api/shop/manage-shop/`,
    "shops":  `/api/admin/shops/`,
    "create_shop":  `/api/create_shop/`,
    "active_shop": (shopId) => `/api/admin/active_shop/${shopId}/`,
    "delete_shop": (shopId) => `/api/admin/delete_shop/${shopId}/`,

    "products":  `/api/products/`,
    "products_admin": (status) => `/api/admin/list-products/?status=${status}`,
    "products_shop": (status) =>  `/api/shop/products/?status=${status}`,
    "change_status_product": `/api/admin/product/change-status/`,
    "view_detail": (productId) => `/api/view-detail/${productId}/`,
    "create_product":  `/api/shop/create_product/`,
    "update_product": (productId) => `/api/shop/update_product/${productId}/`,
    "delete_product": (productId) => `/api/shop/delete_product/${productId}/`,

    "vouchers":  `/api/vouchers/`,
    "create_voucher": `/api/admin/create_voucher/`,
    "update_voucher":   (id) => `/api/admin/update_voucher/${id}/`,
    "delete_voucher": (id) => `/api/admin/delete_voucher/${id}/`,

    "payments":  `/api/payments/`,
    "create_payment": `/api/admin/create_payment/`,
    "update_payment":   (id) => `/api/admin/update_payment/${id}/`,
    "delete_payment": (id) => `/api/admin/delete_payment/${id}/`,

    "order_pay": `/api/pay/`,
    "order_shop": (status) => `/api/shop/orders/?status=${status}`,
    "change_status_order": (orderId) => `/api/shop/change_status/${orderId}/`,
    
    "user_address": `/api/user/address/`,
    "create_address":  `/api/create_address/`,
    "update_address":   (addressId) => `/api/update_address/${addressId}/`,

    "user_purchase":  (status) => `/api/user/purchase/?status=${status}`,
    "user_edit_profile": `/api/user/edit-profile/`,
    "verify_password": `/api/user/verify/password/`,
    "change_password": `/api/user/change-password/`,

    "search_product":  (keyword) =>  `/api/search/?keyword=${keyword}`,
    "search":  (keyword) =>  `/api/search/?keyword=${keyword}`,

    "reviews": (productId) => `/api/reviews/${productId}/`,
    "create_review": (productId) => `/api/create_review/${productId}/`,
    "update_review": (productId) => `/api/update_review/${productId}/`,
    "delete_review": (productId) => `/api/delete_review/${productId}/`,

    "stats":  `/api/stats/`,
    "stats_revenue_chart_month": `/api/stats/revenue_chart_month/`,
    "stats_revenue_chart_quarter": `/api/stats/revenue_chart_quarter/`,
}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": cookie.load("token"),
        }
    })
}

export default axios.create({
    baseURL: SERVER
})
