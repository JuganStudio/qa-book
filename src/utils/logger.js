import fs from 'fs';

import winston from 'winston';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import config from '../../config.json';

const { Logger, transports } = winston;
const { mail } = config;

const level = process.env.NODE_ENV === 'production' ? 'error' : 'debug';
const logPath = `${__dirname}/../../log`;

const logger = new Logger({
    level,
    transports: [
        new transports.Console({ colorize: true }),
        new transports.File({
            filename: `${logPath}/errors.log`,
            level: 'error'
        })
    ]
});

const mailTransport = nodemailer.createTransport(smtpTransport({
    service: mail.service,
    auth: mail.auth
}));

logger.on('logging', (t, logLevel, msg, meta) => {
    if (t.name !== 'file') return;

    const sendMail = (data) => {
        const text = `Message: ${msg}\nMeta: ${JSON.stringify(meta)}\n\nLog\n${data}`;
        const mailOptions = Object.assign({}, mail.options, { text });

        mailTransport.sendMail(mailOptions, (error) => {
            if (error) logger.info('Error while sending email!');
            else logger.info('Send error mail');
        });
    };

    fs.readFile(`${logPath}/errors.log`, 'utf8', (error, data) => {
        if (error) logger.info('Error while read log!');
        else sendMail(data);
    });
});

export default logger;
