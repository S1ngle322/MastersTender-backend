

export default function simplePassValidation(password: string) {
    let array: string[] =
        [
            'qwerty123', '12345678', 'Qwerty123', "QWERTY123", 'qwertyytrewq',
            'ytrewq123', 'ytrewQ123', 'Ytrewq123', 'qwertyy', 'QwertyytrewQ'
        ];

    return array.includes(password);
}