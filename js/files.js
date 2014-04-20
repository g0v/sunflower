function init_view_files()
{
    console.log('init_view_files');
    var elem_categories = $('#literature .categories');
	var elem_files = $('#literature .files');
	
	elem_categories.find('.category').bind('click',OnSwitchCategory);
	elem_categories.find('.category').eq(0).click();
	
	function OnSwitchCategory()
	{
	    console.log('OnSwitchCategory');
	    var category_name = $(this).attr('category-name');
        var category_id = $(this).attr('category_id');
        elem_files.attr('category_id',category_id);
        elem_files.html('');
        
        for(var i=1;i<=10;i++)
        {
            var file = '<div class="file">';
            file += '<img class="file_pic" src="img/default.png"></img>';
            file += '<div class="info">';
            file += '   <div><div class="file_title">標題</div><div class="data"></div></div>';
            file += '   <div><div class="file_author">作者</div><div class="data"></div></div>';
            file += '   <div><div class="file_description">說明</div><div class="data"></div></div>';
            file += '   <div><div class="file_download">下載</div><div class="data"></div></div>';
            file += '</div>';
            elem_files.append(file);
        }
	}
}