let app = new PIXI.Application({
    width: 1400,
    height: 800,
    backgroundColor: 0xCCCCCC,
    autoDensity: true,
});
let el = document.getElementById("app");
el.appendChild(app.view);


function card_register(path, x, y, scale_x, scale_y){     
    let card_texture = new PIXI.Texture.from(path);
    let card_sprite = new PIXI.Sprite(card_texture);
    card_sprite.anchor.set(0.5);

    card_sprite.scale.x = scale_x;
    card_sprite.scale.y = scale_y;

    card_sprite.x = x;
    card_sprite.y = y;

    app.stage.addChild(card_sprite);

    return card_sprite;
}





var fileArea = document.getElementById('dragDropArea');

el.addEventListener('dragover', function(evt){
    evt.preventDefault();
    //console.log("dragover");
});

el.addEventListener('dragleave', function(evt){
    evt.preventDefault();
    //console.log("dragleave");
});

el.addEventListener('drop', function(evt){
    evt.preventDefault();
    
    var files = evt.dataTransfer.files;
    console.log(files[0]);

    const image = new Image();
    const fr = new FileReader();
    // ファイルをdata urlとして読み込みます
    fr.readAsDataURL(files[0]);
    // ファイルをロードした後のイベントリスナを登録
    fr.onload = evt2 => {
        // base64に変換されたurlをimageのsrcに設定
        image.src = evt2.target.result;
        // 画像をロードした後のイベントリスナを登録
        image.onload = () => {
            // アップロードした画像をtextureとして読み込みspriteに貼り付ける
            const card_texture = new PIXI.Texture(new PIXI.BaseTexture(image));
            const card_sprite = new PIXI.Sprite(card_texture);
            // 位置調整
            card_sprite.anchor.set(0.5);
            card_sprite.x = evt.pageX;
            card_sprite.y = evt.pageY;

            card_sprite.scale.x = 0.2;
            card_sprite.scale.y = 0.2;
            // 画面にスプライトを追加
            app.stage.addChild(card_sprite);

            
            card_sprite.interactive = true;

            let move_card = function(e){
                let position = e.data.getLocalPosition(app.stage);
                card_sprite.x = position.x;
                card_sprite.y = position.y;
            }
            
            let card_sprite_big;
            card_sprite.on('pointerdown', function(e){
                card_sprite.on('pointermove', move_card);
            })
            .on('pointerup', function(e){
                card_sprite.off('pointermove', move_card);
            })
            .on('pointerover', function(e){
                card_sprite_big = new PIXI.Sprite(card_texture);
                card_sprite_big.anchor.set(0.5);
            
                card_sprite_big.scale.x = 0.5;
                card_sprite_big.scale.y = 0.5;
            
                card_sprite_big.x = app.screen.width - card_sprite_big.width / 2;
                card_sprite_big.y = app.screen.height - card_sprite_big.height / 2;
            
                app.stage.addChild(card_sprite_big);
                
            }).on('pointerout', function(e){
                app.stage.removeChild(card_sprite_big);
            });


        };
    }
});



document.getElementById('upload').addEventListener('change', evt => {
    // ファイルを読み取る
    const files = evt.target.files;
    if (!files.length) {
        console.log('error! file are not uploaded.');
        return;
    }
    // ImageとFileRaederを使ってアップロードされた画像を読み込む
    const image = new Image();
    const fr = new FileReader();
    // ファイルをdata urlとして読み込みます
    fr.readAsDataURL(files[0]);
    // ファイルをロードした後のイベントリスナを登録
    fr.onload = evt => {
        // base64に変換されたurlをimageのsrcに設定
        image.src = evt.target.result;
        // 画像をロードした後のイベントリスナを登録
        image.onload = () => {
            // アップロードした画像をtextureとして読み込みspriteに貼り付ける
            const card_texture = new PIXI.Texture(new PIXI.BaseTexture(image));
            const card_sprite = new PIXI.Sprite(card_texture);
            // 位置調整
            card_sprite.anchor.set(0.5);
            card_sprite.x = app.screen.width / 2;
            card_sprite.y = app.screen.height / 2;

            card_sprite.scale.x = 0.2;
            card_sprite.scale.y = 0.2;

            // 画面にスプライトを追加
            app.stage.addChild(card_sprite);

            card_sprite.interactive = true;

            
            
            let card_sprite_big;

            on_double_click = false;
            on_tap = false;
            on_move = false;
            start = 0;
            end = 0;

            let move_card = function(e){
                on_move = true;
                let position = e.data.getLocalPosition(app.stage);
                card_sprite.x = position.x;
                card_sprite.y = position.y;
            }

            card_sprite.on('pointerdown', function(e){
                card_sprite_big = new PIXI.Sprite(card_texture);
                card_sprite_big.anchor.set(0.5);
            
                card_sprite_big.scale.x = 0.5;
                card_sprite_big.scale.y = 0.5;
            
                card_sprite_big.x = app.screen.width - card_sprite_big.width / 2;
                card_sprite_big.y = app.screen.height - card_sprite_big.height / 2;
            
                app.stage.addChild(card_sprite_big);

                card_sprite.on('pointermove', move_card);

                on_tap = true;
                console.log("ON_TAP");
                //長押しで画像削除
                setTimeout(function(){
                    if(on_tap == true && on_move == false){
                        document.getElementById("textbox").value = "長押し"
                        app.stage.removeChild(card_sprite);
                        on_tap = false;
                    }else{
                        on_tap = false;
                        on_move = false;
                    }
                }, 1000);

            })
            .on('pointerup', function(e){
                card_sprite.off('pointermove', move_card);
                on_tap = false;
                on_move = false;
                document.getElementById("textbox").value = ""
            })
            .on('pointerover', function(e){
                
            }).on('pointerout', function(e){
                
            }).on('touchstart', function(e){
                
            }).on('touchmove', function(e) {
                
            }).on('touchend', function(e){
                
            });

        };
    }
});