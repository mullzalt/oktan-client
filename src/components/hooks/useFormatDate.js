import { useEffect, useState } from "react";


const useFormatDate = () => {

    const formatDate = (newDate) => {
        const myDate = new Date(newDate);
        const format = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    
        const formatedDate = myDate.toLocaleDateString('id-ID', format)

        return formatedDate
    }

    return formatDate
}


export default useFormatDate 