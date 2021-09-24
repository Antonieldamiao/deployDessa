"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userdao_1 = __importDefault(require("../models/daos/userdao"));
const userview_1 = __importDefault(require("../views/userview"));
const functions_1 = require("../utils/functions");
class UserCtrl {
    static async add(req, resp) {
        const { username, email, password } = req.body;
        const resultSearch = await userdao_1.default.search(email);
        if (resultSearch != null) {
            return resp
                .status(400)
                .json({ MENSAGEM: 'USUÁRIO COM E-MAIL JÁ CADASTRADO' });
        }
        const jump = await bcrypt_1.default.genSalt(15);
        const hashPass = await bcrypt_1.default.hash(password, jump);
        const result = await userdao_1.default.add({
            username: username,
            email: email,
            password: hashPass,
        });
        await (0, functions_1.sendEmail)(result);
        return resp.status(201).json(userview_1.default.reder(result));
    }
    static async list(req, resp) {
        const users = (await userdao_1.default.list());
        if (users != null) {
            return resp.status(200).json(userview_1.default.renderMany(users));
        }
        return resp.status(500).json({ MENSAGEM: 'IMPOSSÍVEL LISTAR USUÁRIOS' });
    }
    static async login(req, resp) {
        const { email, password } = req.body;
        const user = (await userdao_1.default.search(email));
        if (user != null) {
            const validePassword = await bcrypt_1.default.compare(password, String(user.password));
            if (validePassword && user.active) {
                return resp
                    .cookie('user_data', Buffer.from(JSON.stringify(await (0, functions_1.generateObject)(user))).toString('base64'), {
                    httpOnly: true,
                    secure: false,
                })
                    .status(200)
                    .json(userview_1.default.reder(user));
            }
            return resp
                .status(400)
                .json({ MENSAGEM: 'SENHA INCORRETA OU USUÁRIO NÃO EXISTE' });
        }
        return resp.status(404).json({ MENSAGEM: 'USUÁRIO NÃO EXISTE' });
    }
    static async logout(req, resp) {
        return resp
            .clearCookie('user_data')
            .status(200)
            .json({ MENSAGEM: 'LOGOUT EFETUADO COM SUCESSO' });
    }
    static async validateAccount(req, resp) {
        const { id } = req.params;
        await (0, functions_1.validadeAccount)(id);
        return resp.status(200).json({ MENSAGEM: 'USUARIO VALIDADO' });
    }
}
exports.default = UserCtrl;
