package io.ionic.starter;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.datatheorem.android.trustkit.TrustKit;
import com.datatheorem.android.trustkit.reporting.BackgroundReporter;
import com.datatheorem.android.trustkit.reporting.PinningFailureReport;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.whitestein.securestorage.SecureStoragePlugin;

public class MainActivity extends BridgeActivity {
  PinningFailureReportBroadcastReceiver pinningFailureReportBroadcastReceiver;
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Initializes the Bridge
    if (android.os.Build.VERSION.SDK_INT <= 24){
      // Do something for lollipop and above versions
      TrustKit.initializeWithNetworkSecurityConfiguration(this);
      pinningFailureReportBroadcastReceiver
              = new PinningFailureReportBroadcastReceiver();
      IntentFilter intentFilter = new IntentFilter(BackgroundReporter.REPORT_VALIDATION_EVENT)  ;
      LocalBroadcastManager.getInstance(this)
              .registerReceiver(pinningFailureReportBroadcastReceiver,intentFilter) ;
    }
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(GoogleAuth.class);
      add(com.getcapacitor.community.facebooklogin.FacebookLogin.class);
      add(SecureStoragePlugin.class);
    }});

  }
}

class PinningFailureReportBroadcastReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    PinningFailureReport report = (PinningFailureReport) intent.getSerializableExtra(BackgroundReporter.EXTRA_REPORT);
  }
}
