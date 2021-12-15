#import <Foundation/Foundation.h>
#import "React/RCTViewManager.h"
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReactNativeShowPasswordViewManager, RCTViewManager)

RCT_EXTERN_METHOD(focus)

RCT_EXPORT_VIEW_PROPERTY(color, NSString)
RCT_EXPORT_VIEW_PROPERTY(returnKeyTypeProp, NSString)
RCT_EXPORT_VIEW_PROPERTY(inputStyle, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(labelStyle, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(isVisible, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBlur, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFocus, RCTBubblingEventBlock)

@end
