1、注入检测正则

     xss：
        /[\'\"\;\*\<\>]+.*\b(on)[a-zA-Z]{3,15}[\s\r\n\v\f]*\=|\b(expression)\(|<script[\s\\\\\/]*.*>|(<!\[cdata\[)|\b(eval|alert|prompt|msgbox)\s*\(|url\((\#|data|javascript)/si
     sql：
        /([^{\s]{1}.+(select|update|insert((\/\*[\S\s]*?\*\/)|(\s)|(\+))+into).+?(from|set)((\/\*[\S\s]*?\*\/)|(\s)|(\+))+)|[^{\s]{1}.+(create|delete|drop|truncate|rename|desc)((\/\*[\S\s]*?\*\/)|(\s)|(\+))+(table|from|database)((\/\*[\S\s]*?\*\/)|(\s)|(\+))|(into((\/\*[\S\s]*?\*\/)|\s|\+)+(dump|out)file\b)|\bsleep\((\s*)(\d*)(\s*)\)|benchmark\(([^\,]*)\,([^\,]*)\)|\b(declare|set|select)\b.*@|union\b.*(select|all)\b|(select|update|insert|create|delete|drop|grant|truncate|rename|exec|desc|from|table|database|set|where)\b.*((charset|ascii|bin|char|uncompress|concat|concat_ws|conv|export_set|hex|instr|left|load_file|locate|mid|sub|substring|oct|reverse|right|unhex)\(|(master\.\.sysdatabases|msysaccessobjects|msysqueries|sysmodules|mysql\.db|sys\.database_name|information_schema\.|sysobjects|sp_makewebtask|xp_cmdshell|sp_oamethod|sp_addextendedproc|sp_oacreate|xp_regread|sys\.dbms_export_extension))/si
