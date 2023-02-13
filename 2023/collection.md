
> 1、注入检测正则

     xss：
        /[\'\"\;\*\<\>]+.*\b(on)[a-zA-Z]{3,15}[\s\r\n\v\f]*\=|\b(expression)\(|<script[\s\\\\\/]*.*>|(<!\[cdata\[)|\b(eval|alert|prompt|msgbox)\s*\(|url\((\#|data|javascript)/si
     sql：
        /([^{\s]{1}.+(select|update|insert((\/\*[\S\s]*?\*\/)|(\s)|(\+))+into).+?(from|set)((\/\*[\S\s]*?\*\/)|(\s)|(\+))+)|[^{\s]{1}.+(create|delete|drop|truncate|rename|desc)((\/\*[\S\s]*?\*\/)|(\s)|(\+))+(table|from|database)((\/\*[\S\s]*?\*\/)|(\s)|(\+))|(into((\/\*[\S\s]*?\*\/)|\s|\+)+(dump|out)file\b)|\bsleep\((\s*)(\d*)(\s*)\)|benchmark\(([^\,]*)\,([^\,]*)\)|\b(declare|set|select)\b.*@|union\b.*(select|all)\b|(select|update|insert|create|delete|drop|grant|truncate|rename|exec|desc|from|table|database|set|where)\b.*((charset|ascii|bin|char|uncompress|concat|concat_ws|conv|export_set|hex|instr|left|load_file|locate|mid|sub|substring|oct|reverse|right|unhex)\(|(master\.\.sysdatabases|msysaccessobjects|msysqueries|sysmodules|mysql\.db|sys\.database_name|information_schema\.|sysobjects|sp_makewebtask|xp_cmdshell|sp_oamethod|sp_addextendedproc|sp_oacreate|xp_regread|sys\.dbms_export_extension))/si

> 2、vite 打包降级
>
    export default defineConfig({
       plugins: [
          // 增加 legacy
          +legacy({
          +  targets: ['defaults', 'not IE 11']
          +}),
          react()
        ],
       ....
       build:{
          // 指定比较低的版本
          +target: ['es2015', 'chrome63'], 
       }
    });

需要安装：
  
    @vitejs/plugin-legacy
    terser

打包后本地可直接打开：<br/>
安装:

    fs  //文件读写
    html-minifier-terser //压缩html
新建 toFile.js:
   
    import fs from "fs";
    import { minify } from 'html-minifier-terser';
    console.time("转换耗时");
    //打包路径的index.html
    const distPath = "./dist/index.html"; 
    //读取打包后的文件
    let htmlText = fs.readFileSync(distPath, "utf8");
    let resultText = "";
    let htmlArr = htmlText.match(/.*\n/g) || [];
    htmlArr.forEach((str) => {
      //替换js加载方式
      str = str.replace(/\s?nomodule\s?/g, " ");
      str = str.replace(/\s?crossorigin\s?/g, " ");
      str = str.replace(/data-src/g, "src");
      if (!/type="module"/i.test(str)) resultText += str;
    });
    //压缩
    const resultText2 = await minify(resultText, {
      minifyCSS:true,
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace:true,
      removeEmptyAttributes:true,
      removeComments:true,
      removeTagWhitespace:true
    });
    //写入新文件
    fs.writeFileSync(distPath, resultText2, "utf8");
    console.timeEnd("转换耗时");


   
