//A= Kuyunun giriş kapısının  olduğu duvar -Genişlik
//B= Kuyunun giriş kapısının tam karşısındaki duvar-Genişlik
//C= Kuyunun girişinin SOL tarafındaki duvar-Derinlik
//D= Kuyunun girişinin SAĞ tarafındaki duvar-Derinlik

export const ShaftConstantDatas = {
  door: {
    door_A_WS: 50,
    door_B_WS: 50,
    door_CtwWs: 50,
    door_cabinWS: 50,
  },
  carcassLength: {
    //Karkas boyu aşağıdan yukarıya sırasiyla;
    bufferHeightMin: 300,//Ağırlık Şasesi Tamponu,
    bufferWS: 100,//Ağırlık Şasesi Tamponu Çalışma boşluğu,
    downside: 150,//Ağırlık Şasesi Alt demiri ,
    ctwWs: 200,//Ağırlık Şasesi ve ağırlıklar arasında kalan boşluk,
    upside: 150,//Ağırlık şasesi üst kısımı ,
    pulley: 320,//Kasnak + Kasnak Koruma Sacı Üst Kısım Düşüldüğünde ,
    pulleyProtection: 6,//Kasnak + Kasnak Koruma Sacı Üst Kısım Düşüldüğünde ,
    ceilingWs: 300,// Ağırlık şasesi ve Motor Sehpası boşluğu,
    //*********** Beam ve RailBase ile ilgili olanlar ****************//
    machineBeam: 300,//Özel ölçülü Sehpa
    motorHeight: 300,// Motor Yüksekliği
    motorToCeilingWS: 300,// Motorun üstünden bina tavanına olan çalışma boşluğu
    carcassMotorWs: 300,// Ağırlık şasesi ve Motor Sehpası boşluğu Ray tipi sehpada
  },

  carcassDepth: {
  ctw_D_WS: 50,//Ağırlık Şasesi ve duvar arasında kalan boşluk,
  ctwPudrelWs: 50,//Ağırlık Şasesi ve pudrel arasında kalan boşluk,
  pudrelWidth: 55,//Pudrel genişliği,
  pudrelDoorWs: 50,//Pudrel ve kapı arasında kalan boşluk,
  ctw_B_WS: 50,//Ağırlık Şasesi ve duvar arasında kalan boşluk,
  seperatorCtwWs: 50,//Ağırlık Şasesi ve Separatör sacı arasında kalan boşluk,
  seperatorWidth: 20,//Separatör sacı genişliği,
  seperatorCabinWs: 50,//Separatör sacı ve kabin arasında kalan boşluk,
  },

  carcassWidth:{
  pudrelWallWS: 50,//Pudrel ve Giriş duvar arasında kalan boşluk,
  pudrelWidth: 55,//Pudrel genişliği,
  ctwRailSizeMax: 65,//Ağırlık Şasesi Rayı Max Boyu,
  railCarcassWs: 50,//Ağırlık Şasesi Rayı ve Ağırlık Şasesi arasında kalan boşluk,
  doorPudrelWs: 70,//Kapı ve Pudrel arasında kalan boşluk,
  },
  
  cabinWidth: {
    railWallConsoleMin: 70,
    railWallConsoleMax: 310,
    railCabinWS: 75,//Anaray ile kabin arasındaki boşluk
    mainRailSizeMax: 75,//90 B ray 

//** */
    pudrelConsole: 20,//Pudrel konsolu,
  },

  railWallConsoleMin: 50,
  railWallConsoleMax: 180,
  mainRailSizeMin: 65,//70 A ray 
  mainRailSizeMax: 75,//90 B ray 
  cabinWS: 75,// Kabin çalışma boşluğu--- kabin-ray yada kabin-duvar arası düşünülebilir
  backsideCtwConsoleToWallWS: 50,
  backsideCtwConsoleWidth: 55,
  ctwRailSizeMin: 50,//50 A ray
  ctwRailSizeMax: 65,//70 A ray
  ctwRailToCtwCarcassWS: 50, //Ağırlık rayı ile ağırlık şasesi arasındaki çalışma boşluğu.
  ctwToCabinWs: 75, //Arkadan Ağırlıkta kabin ve ağırlık şasesi arasındaki çalşma boşluğu.
  ctwCarcassToWallWs: 75, //Ağırlık şasesinin duvara olan çalşma boşluğu
  oneRowCtwWidth: 160,//Tek sıra ağırlık Genişliği
  doubleRowCtwWidth: 400,//Çift sıra ağırlık Genişliği
  ctwToPudrelWs: 50,//ağırlık şasesi pudrel arası çalşma boşluğu
  pudrelWidth: 55,
  pudrelRailConsole: 20,//Pudrele kaynaklı yada bağlı Ray konsolu
  railToCabinWS: 50,//Anaray ile kabin arasındaki boşluk
  cabinToWallWS: 75,//Kabin ve duvar arasındaki çalşma boşluğu
  doorToCtwWS: 50,//kapıdan ağırlık pudreline olan çalşma boşlğu
  pudrelWallWS: 50,

};
