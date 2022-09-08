import { useEffect } from "react"

const NoPage = () => {
    useEffect(() => {
        document.title = "Không tìm thấy yêu cầu"
    }, [])
    return (
        <h1 className="container" style={{ textAlign: 'center', fontSize: '100px', color: 'red', marginTop: '10px' }}>
            KHÔNG TÌM THẤY YÊU CẦU
        </h1>
    );
};

export default NoPage;
