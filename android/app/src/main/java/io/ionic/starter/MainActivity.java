package io.ionic.starter;

import android.os.Bundle;
import android.view.WindowManager;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.whitestein.securestorage.SecureStoragePlugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(GoogleAuth.class);
      getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
      add(com.getcapacitor.community.facebooklogin.FacebookLogin.class);
      add(SecureStoragePlugin.class);
    }});
    
  }
}
