let menuOpen = false;

RegisterNuiCallbackType('close');
on('__cfx_nui:close', (data, cb) => {
    SetNuiFocus(false, false);
    menuOpen = false;
    cb();
});

on('mrp:radial_menu:toggle', () => {
    if (menuOpen)
        SetNuiFocus(true, true);
    else
        SetNuiFocus(false, false);

    SendNuiMessage(JSON.stringify({
        type: 'toggle'
    }));
});

on('mrp:radial_menu:addMenuItem', (data) => {
    SendNuiMessage(JSON.stringify({
        type: 'addItem',
        item: data
    }));
});

RegisterCommand('showMenu', () => {
    menuOpen = !menuOpen;
    emit('mrp:radial_menu:toggle');
})

RegisterKeyMapping('showMenu', 'Show magic menu', 'keyboard', 'f1');