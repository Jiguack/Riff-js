//h ComponentSetting.js ������, �ַ� DOM Element�� className ���� ���� �׿� �´� markUp �� �籸���� �ش�.

riff(function () {

// Widget Basic Default Setting
//h ����ڰ� setTitle component�� ������� �ʾҴٸ�, setTitle �� �߰��� �ش�.( = setTitle Component �� ȯ�漳�� ����� ���� �ʿ��� component ) 
( riff('body').find('.setTitle').size() == 0 && riff('body').append('<div class="setTitle"></div>') );
//h ����ڰ� feedReceiveTime component�� ������� �ʾҴٸ�, feedReceiveTime �� �߰��� �ش�.( = feedReceiveTime Component �� RSS Feed�� ����� ��, ������ ���� �ð��� ǥ���ϱ� ���� component ) 
( riff('body').find('.feedReceiveTime').size() == 0 && riff('body').append('<div class="feedReceiveTime"></div>') );

//h popup���� ȭ�鿡 ǥ�õ� ��, ����� ���� �ٸ� ���� Ŭ������ ���ϰ� �ϱ� ���� DIV �߰�.
riff('body').append('<div class="blackBlank"></div>'); // Black Blank Element
riff('body').append('<div class="whiteBlank"></div>'); // Black Blank Element

//h widget ������ �� ���̴� IDLE ȭ���, ��üȭ���� ������ �ֱ� ���� markUp �߰�.
riff('body').contents().not( riff("#idle").dom() )
			.wrapAll('<div class="widgetWrap"></div>'); // Widget Wrapping
//h Scene�� �����ϴ� ��ü ȭ�鿡 scene�� �� �� ���μ�, ȭ�� ũ�� ���� �����ش�.
riff('body').find('.scene').wrapAll('<div class="scenes"></div>');

//h Busy Indicator �� �־��ְ�, �����Ѵ�.
// Busy Indicator Default Setting
riff('.blackBlank')
.before('<div class="popup" id="busyIndicator"><div class="busyIndicator type1"></div><div class="busyIndicatorTxt">Loading, Please wait...</div></div>')
.before('<div class="popup" id="alert"></div>');

//h navigator.userAgent : ����Ǵ� ������ �̸� �������� ���.
var agent = navigator.userAgent;
if( agent.indexOf("SHW-M110S") != -1)			// widget mode ?
	riff("title").before('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1; target-densitydpi=device-dpi"/>');
else if( riff.isWidget() && !riff.isEmulator() )// PC mode ?
	riff("title").before('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1; target-densitydpi=120"/>');
else 											// SDK mode ?
	riff("title").before('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1"/>');

//h softkey�� ����/ ��ɵ��� ����
riff.option( {
	"softkeySetListData" : {
		"OK" : function() {
			var sceneInfo = riffGlobal.sceneStack.pop();
				riffGlobal.sceneStack.push(sceneInfo);

			riff.back();
			riff(sceneInfo[0]).find(".setList").okFunc();
		}
	},
	"softkeySetListFunc" : function() {
		var sceneInfo = riffGlobal.sceneStack.pop(),
			selectData = riffGlobal.setListSelectData,
			setList = riff(sceneInfo[0]).find(".setList"),
			setListDataSet = setList.buffer("ComponentSettingListComponentDataSet");
		riffGlobal.sceneStack.push(sceneInfo);

		for( var k in setListDataSet )
			setList.subSceneSelect(setListDataSet[k].key, "off");
		
		for( var k in selectData )
			setList.subSceneSelect(selectData[k], "on");

		riff.back();
	},
	"eventType" : (riff.isWidget()) ? "touch" : "mouse",
	"softkeyFunc" : function () { riff.back(); },
	"softkeyType" : "type1",
	"softkeyData" : {}
});

//h scene, title, setTitle, list, setList, tab, popup Component �� ���� markUp ������
riff('.idle').makeStructs();
riff('.scene').makeStructs();
riff('.title').makeStructs();
riff('.setTitle').makeStructs();
riff('.list').makeStructs();
riff('.setList').makeStructs();
riff(".tab").makeStructs();
riff(".popup").makeStructs();

//h ���� ���� Ű
if( riff.isWidget() && !riff.isEmulator() )
{
	widget.addEventListener("widgetendkey",
	function()	{
		riff.move("#idle");
	}, false);
}


//h AutoRefresh �� �����Ǿ� �ִٸ�, autoRefresh �� ��������.
if ( riffGlobal.rssAutoRefreshTime > 0 )
{
	riff('.tab').autoRefresh( riffGlobal.rssAutoRefreshTime );
	riff('.list').autoRefresh( riffGlobal.rssAutoRefreshTime );
};

//h idle ȭ���� �⺻���� ��������.
riff.move("#idle");

}); //End Load
