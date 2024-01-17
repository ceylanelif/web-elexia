export const ShaftConstantDatas = {
    door:{door_A_WS: 50,
      door_B_WS: 50,
      door_CtwWs: 50,
      door_cabinWS: 50,},

    railWallConsoleMin: 50,
    railWallConsoleMax: 180,
    mainRailSizeMin: 65,//70 A ray 
    mainRailSizeMax: 75,//90 B ray 
    cabinWS: 75,// Kabin çalışma boşluğu--- kabin-ray yada kabin-duvar arası düşünülebilir
    backsideCtwConsoleToWallWS: 50,
    backsideCtwConsoleWidth: 55,
    ctwRailSizeMin:50,//50 A ray
    ctwRailSizeMax:65,//70 A ray
    ctwRailToCtwCarcassWS:50, //Ağırlık rayı ile ağırlık şasesi arasındaki çalışma boşluğu.
    ctwToCabinWs:75, //Arkadan Ağırlıkta kabin ve ağırlık şasesi arasındaki çalşma boşluğu.
    ctwCarcassToWallWs:75, //Ağırlık şasesinin duvara olan çalşma boşluğu
    oneRowCtwWidth:160,//Tek sıra ağırlık Genişliği
    doubleRowCtwWidth:400,//Çift sıra ağırlık Genişliği
    ctwToPudrelWs:50,//ağırlık şasesi pudrel arası çalşma boşluğu
    pudrelWidth:55,
    pudrelRailConsole:20,//Pudrele kaynaklı yada bağlı Ray konsolu
    railToCabinWS:50,//Anaray ile kabin arasındaki boşluk
    cabinToWallWS:75,//Kabin ve duvar arasındaki çalşma boşluğu
    doorToCtwWS:50,//kapıdan ağırlık pudreline olan çalşma boşlğu
    pudrelWallWS:50,
    //Carcass ile başlayalar ağırlık şasesinin boyunu hesaplamak için
    carcassBufferHeightMin:300,//Ağırlık Şasesi Tamponu
    carcassBufferWS:100,//Ağırlık Şasesi Tamponu Çalışma boşluğu
    carcassDownside:150,//Ağırlık Şasesi Alt demiri 
    carcassUpside:150,//Ağırlık şasesi üst kısımı 
    carcassCtwWs:200,//Ağırlık Şasesi ve ağırlıklar arasında kalan boşluk
    carcassPulley:320,//Kasnak + Kasnak Koruma Sacı Üst Kısım Düşüldüğünde 
    carcassPulleyProtection:6,//Kasnak + Kasnak Koruma Sacı Üst Kısım Düşüldüğünde 
    carcassToMotorWS:300,// Ağırlık şasesi ve Motor Sehpası boşluğu
    carcassToCeilingWS:300,// Ağırlık şasesi ve Motor Sehpası boşluğu
    carcassMachineBeam:300,//Özel ölçülü Sehpa
    carcassMotorHeight:300,// Motor Yüksekliği
    carcasssMotorToCeilingWS:300,// Motorun üstünden bina tavanına olan çalışma boşluğu
  };
//A= Kuyunun giriş kapısının  olduğu duvar -Genişlik
//B= Kuyunun giriş kapısının tam karşısındaki duvar-Genişlik
//C= Kuyunun girişinin SOL tarafındaki duvar-Derinlik
//D= Kuyunun girişinin SAĞ tarafındaki duvar-Derinlik
  export const DoorConstDatas = {
    
  }