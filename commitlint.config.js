module.exports = {
    rules: {
        // Valida o cabeçalho inteiro com regex personalizada
        "header-regex": [
            2,
            "always",
            /^\[\d+\] - (feat|fix|chore|docs|refactor|test|style): .+$/,
        ],
        "subject-empty": [2, "never"],
    },
};
