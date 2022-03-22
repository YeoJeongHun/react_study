
import request from '../utils/request';



export async function queryNoticeInfo(token, noticeSeq) {
    return request(`/api/notice/list/${noticeSeq}`, {
        method: 'POST',
        headers: { Authorization: token },
    });
}