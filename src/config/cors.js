import { env } from "~/config/environment";
import { WHITELIST_DOMAINS } from "~/utils/constants";
// Cấu hình CORS cho server
export const corsOptions = {
  origin : function (origin, callback) {
    console.log("origin : ", origin);
    // Cho phép gọi Api bằng postman trên môi trường dev
    if (!origin && env.BUILD_MODE === "dev") {
      return callback(null, true);
    }

    // Kiểm tra origin của request có trong whitelist không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    // Nếu không tìm thấy origin trong whitelist thì trả về lỗi
    return callback(new Error("Not allowed by CORS"));
  },
  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS cho phép sử dụng cookie từ client
  credentials: true
}
