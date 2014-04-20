
function init_view_character()
{
    console.log('init_view_character');

    var elem_groups = $('#character .groups');
	var elem_members = $('#character .members');
	
	elem_groups.find('.group').bind('click',OnSwitchGroup);
	elem_groups.find('.group').eq(0).click();
	
	function OnSwitchGroup()
	{
	    var group_name = $(this).attr('group-name');
        var group_id = $(this).attr('group_id');
        elem_members.attr('group_id',group_id);
       
        var html_banner = '<div class="banner">';
        html_banner += '<div class="logo"><img src="img/default.png"></div>';
		html_banner += '<div class="title">'+group_name+'</div>';
		html_banner += '</div>';
		elem_members.html($(html_banner));
       
        for(var i=1;i<=30;i++)
        {
            var member = '<div class="member">';
            member += '<img class="avatar" src="img/default.png"></img>';
            member += '<div class="name">成員'+i+'</div>';
            member += '</div>';
            elem_members.append(member);
        }
	}
}