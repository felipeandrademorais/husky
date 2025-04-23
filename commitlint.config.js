module.exports = {
    rules: {
        // Exige que a mensagem comece com o padrão [123]
        "header-pattern": [
            2,
            "always",
            /^\[\d+\] - (feat|fix|chore|docs|refactor|test|style): .+$/,
        ],
        "subject-empty": [2, "never"],
    },
};
