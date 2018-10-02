export default (errDetail) => {
    switch (errDetail.code) {
        case 40101:
            return '아이디 및 패스워드 확인이 필요합니다.'
        default:
            return '오류가 발생했습니다.';
    }
}