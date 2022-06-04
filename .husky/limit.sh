#!/bin/sh
file_max_size=500
filterMimes=(
            'image/jpeg'
            'image/webp'
            'image/svg+xml'
            'image/png'
        )
git status | grep  "new file" | while read line;
do
    # 文件路径
    file_name=`echo $line | awk '{print $3 }'`
    # echo "$file_name"
    # 如果文件存在
    if [ -f "$file_name" ]
    then
        # 获取操作系统
       unameOut="$(uname -s)"
            case "${unameOut}" in
                Linux*)     machine=Linux;;
                Darwin*)    machine=Mac;;
                CYGWIN*)    machine=Cygwin;;
                MINGW*)     machine=MinGw;;
                *)          machine="UNKNOWN:${unameOut}"
                esac
        # 文件mime类型
        file_mime=`file -b --mime-type  $file_name`
        for i in "${filterMimes[@]}"; do
            # 如果是上述图片类型
            if test $i = $file_mime
            then
                # 文件大小
                # file_size=`stat -c%s  $file_name`
                    # 如果是mac os 系统
                    if test $machine = "Mac"
                    then
                        file_size=`stat -f%z  $file_name`
                    else
                        file_size=`stat -c%s  $file_name`
                    fi
                    # 把图片大小转换成kb,保留2位小数点
                    sizekb=`echo "$file_size 1024" | awk '{printf "%i", $1 / $2}'`
                    # 如果文件大小大于最大限制
                    if [ $sizekb -gt  $file_max_size ]
                    then
                        echo "**********图片类文件不可超过 $file_max_size KB 请找ui同学处理或者自行压缩*********"
                        echo "*********** $file_name 为 $sizekb KB *************"
                        # 中止 commit 
                        exit 1
                    fi

            fi
        done
    fi
done