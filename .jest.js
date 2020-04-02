module.exports = {
    setupFiles: [
        './_test_/setup.js',  // 测试启动文件
    ],
    testURL: 'http://localhost', // 测试环境URL
    testEnvironment: 'jsdom', // 测试环境
    moduleFileExtensions: ['js', 'jsx', 'json'], // 单元测试文件检测后缀名
    testPathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: { // mock模块
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/_test_/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
    },
    transformIgnorePatterns: [ // 不转化es6的文件夹匹配
        'node_modules\/[^/]+?\/(?!(es|node_modules)\/)', // Ignore modules without es dir
    ]
};