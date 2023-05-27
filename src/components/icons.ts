import { OhVueIcon, addIcons } from "oh-vue-icons";
import {  FaRegularSquare,
    FaRegularCheckSquare,
    FaBellSlash,
    FaBell,
    FaCommentSlash,
    FaComment,
    FaDoorClosed, 
    FaDoorOpen,
    FaEyeSlash,
    FaEye,
    FaFolder,
    FaFolderOpen,
    FaMicrophoneSlash,
    FaMicrophone,
    FaPhoneSlash,
    FaPhone,
    FaPlaneSlash,
    FaPlane,
    FaToggleOff,
    FaToggleOn,
    FaVolumeOff,
    FaVolumeUp,
    FaRegularBookmark,
    FaBookmark,
    FaRegularCircle,
    FaRegularDotCircle,
    FaRegularStar,
    FaStar,
    FaRegularHeart,
    FaHeart } from "oh-vue-icons/icons";
import type { App } from "vue";

const initIcons = (app: App)=>{
    addIcons(FaRegularSquare,
        FaRegularCheckSquare,
        FaBellSlash,
        FaBell,
        FaCommentSlash,
        FaComment,
        FaDoorClosed, 
        FaDoorOpen,
        FaEyeSlash,
        FaEye,
        FaFolder,
        FaFolderOpen,
        FaMicrophoneSlash,
        FaMicrophone,
        FaPhoneSlash,
        FaPhone,
        FaPlaneSlash,
        FaPlane,
        FaToggleOff,
        FaToggleOn,
        FaVolumeOff,
        FaVolumeUp,
        FaRegularBookmark,
        FaBookmark,
        FaRegularCircle,
        FaRegularDotCircle,
        FaRegularStar,
        FaStar,
        FaRegularHeart,
        FaHeart);
    app.component("v-icon", OhVueIcon);
}

export default initIcons;