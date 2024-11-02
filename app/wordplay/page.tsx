import React from "react";
import WipPage from "../../components/wip";
import { caveat } from "../fonts";

export default function Page(){
    return (
        <>
        <WipPage><span className={"text-main-600 text-4xl font-bold " + caveat.className}>WordPlay</span></WipPage>
        </>
    )
}