export default (errDetail) => {
    switch (errDetail.code) {
        case 40001:
            return 'DB 저장 중 오류가 발생하였습니다.';
        case 40002:
            return '존재하지 않는 데이터입니다.';
        case 40003:
            return '이미 존재하는 데이터 입니다.';
        case 40101:
            return '아이디 및 패스워드 확인이 필요합니다.';
        default:
            return '오류가 발생했습니다.';
    }
}