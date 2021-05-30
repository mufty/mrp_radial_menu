# mrp_radial_menu

ensure mrp_radial_menu

# DOC

To add menu item trigger event mrp:radial_menu:addMenuItem on your client side with an object like this:

{
    id: 'revive',
    text: 'Revive',
    action: 'https://mrp_core/revive'
}

Where:
    - "id" is a unique ID of the menu item there can only be one item with the same ID in the menu
    - "text" is the label of the menu
    - "action" is the NUI callback that'll be called when the item is clicked
    
Javascript example:

emit('mrp:radial_menu:addMenuItem', {
    id: 'revive',
    text: 'Revive',
    action: 'https://mrp_core/revive'
});

Lua example:

TriggerEvent('mrp:radial_menu:addMenuItem', {
        id = "revive",
        text = "Revive",
        action = "https://mrp_core/revive"
})

To remove a menu item use the same approach for event mrp:radial_menu:removeMenuItem with onbject:

{
    id: 'revive'
}

where "id" is the menu item to remove.